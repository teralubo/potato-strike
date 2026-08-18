#include <furi.h>
#include <gui/gui.h>
#include <input/input.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    Gui* gui;
    ViewPort* viewport;
    FuriMessageQueue* input_queue;
    int player_x;
    int enemy_x;
    int enemy_y;
    int bullet_x;
    int bullet_y;
    int hp;
    int score;
    bool bullet_active;
    bool running;
} PotatoStrikeMini;

static void potato_draw(Canvas* canvas, void* ctx) {
    PotatoStrikeMini* game = ctx;
    canvas_clear(canvas);
    canvas_set_font(canvas, FontPrimary);
    canvas_draw_str(canvas, 2, 10, "Potato Strike P1.3");
    canvas_set_font(canvas, FontSecondary);
    char hud[32];
    snprintf(hud, sizeof(hud), "HP:%d  SCORE:%d", game->hp, game->score);
    canvas_draw_str(canvas, 2, 22, hud);
    canvas_draw_box(canvas, game->player_x, 56, 10, 6);
    canvas_draw_frame(canvas, game->enemy_x, game->enemy_y, 10, 8);
    if(game->bullet_active) canvas_draw_disc(canvas, game->bullet_x, game->bullet_y, 2);
    canvas_draw_line(canvas, 0, 63, 127, 63);
}

static void potato_input(InputEvent* event, void* ctx) {
    PotatoStrikeMini* game = ctx;
    furi_message_queue_put(game->input_queue, event, 0);
}

static void potato_reset_enemy(PotatoStrikeMini* game) {
    game->enemy_x = 6 + (rand() % 112);
    game->enemy_y = 28 + (rand() % 18);
}

int32_t potato_strike_mini_app(void* p) {
    UNUSED(p);
    PotatoStrikeMini* game = malloc(sizeof(PotatoStrikeMini));
    game->gui = furi_record_open(RECORD_GUI);
    game->viewport = view_port_alloc();
    game->input_queue = furi_message_queue_alloc(8, sizeof(InputEvent));
    game->player_x = 58;
    game->bullet_x = 0;
    game->bullet_y = 0;
    game->hp = 5;
    game->score = 0;
    game->bullet_active = false;
    game->running = true;
    potato_reset_enemy(game);

    view_port_draw_callback_set(game->viewport, potato_draw, game);
    view_port_input_callback_set(game->viewport, potato_input, game);
    gui_add_view_port(game->gui, game->viewport, GuiLayerFullscreen);

    while(game->running) {
        InputEvent event;
        if(furi_message_queue_get(game->input_queue, &event, 40) == FuriStatusOk) {
            if(event.type == InputTypePress || event.type == InputTypeRepeat) {
                if(event.key == InputKeyBack) game->running = false;
                if(event.key == InputKeyLeft && game->player_x > 1) game->player_x -= 5;
                if(event.key == InputKeyRight && game->player_x < 117) game->player_x += 5;
                if(event.key == InputKeyUp && !game->bullet_active) {
                    game->bullet_active = true;
                    game->bullet_x = game->player_x + 5;
                    game->bullet_y = 54;
                }
            }
        }

        if(game->bullet_active) {
            game->bullet_y -= 4;
            if(game->bullet_y < 8) game->bullet_active = false;
            if(game->bullet_x >= game->enemy_x && game->bullet_x <= game->enemy_x + 10 &&
               game->bullet_y >= game->enemy_y && game->bullet_y <= game->enemy_y + 8) {
                game->score++;
                game->bullet_active = false;
                potato_reset_enemy(game);
            }
        }

        game->enemy_y += (game->score / 6) + 1;
        if(game->enemy_y > 55) {
            game->hp--;
            potato_reset_enemy(game);
        }
        if(game->hp <= 0) {
            game->hp = 5;
            game->score = 0;
            potato_reset_enemy(game);
        }
        view_port_update(game->viewport);
    }

    gui_remove_view_port(game->gui, game->viewport);
    view_port_free(game->viewport);
    furi_message_queue_free(game->input_queue);
    furi_record_close(RECORD_GUI);
    free(game);
    return 0;
}
