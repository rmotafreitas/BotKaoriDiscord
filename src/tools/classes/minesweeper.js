const { Client, Message, MessageEmbed } = require("discord.js");

const WIDTH = 10;
const HEIGHT = 10;
/*
0: not played yet
-1: bomb
-2: no bombs around
-11: flag on bomb
-12: flag not in bomb
numbers>0:number of bombs in 8
*/

class minesweeper {
  constructor() {
    this.gameBoard = [];
    this.bombsFlags = 12;
    for (let x = 0; x < WIDTH; x++) {
      this.gameBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    //? Generate 12 random bombs
    for (let i = 0; i < 12; i++) {
      const randomBomb = Math.floor(Math.random() * 100);
      const locaction = {
        x: Math.floor(randomBomb / 10),
        y: randomBomb % 10,
      };
      if (this.gameBoard[locaction.x][locaction.y] == -1) {
        i--;
      } else {
        this.gameBoard[locaction.x][locaction.y] = -1;
      }
    }
  }

  newGame(msg) {
    let id = msg.author.id;

    function verifyWin(gameBoard) {
      for (let y = 0; y < WIDTH; y++) {
        for (let x = 0; x < HEIGHT; x++) {
          if (gameBoard[y][x] == -12) return false;
        }
      }
      for (let y = 0; y < WIDTH; y++) {
        for (let x = 0; x < HEIGHT; x++) {
          if (gameBoard[y][x] == 0) return false;
        }
      }
      return true;
    }
    function GetXY(locations) {
      const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
      const Locals = {
        y: letras.indexOf(locations[0]),
        x: letras.indexOf(locations[1]),
      };
      return Locals;
    }
    function ShowGame(bombsFlags, gameBoard) {
      let showGameBoard = `__Bombs left: ${bombsFlags}__\n\n🔲`;
      let letras = [
        ":regional_indicator_a:",
        ":regional_indicator_b:",
        ":regional_indicator_c:",
        ":regional_indicator_d:",
        ":regional_indicator_e:",
        ":regional_indicator_f:",
        ":regional_indicator_g:",
        ":regional_indicator_h:",
        ":regional_indicator_i:",
        ":regional_indicator_j:",
      ];
      for (let i = 0; i < letras.length; i++) {
        showGameBoard += letras[i];
      }
      showGameBoard += "\n";
      for (let x = 0; x < WIDTH; x++) {
        showGameBoard += letras[x];
        for (let y = 0; y < HEIGHT; y++) {
          switch (gameBoard[x][y]) {
            case -11:
            case -12:
              showGameBoard += "🚩";
              break;
            case 1:
              showGameBoard += ":one:";
              break;
            case 2:
              showGameBoard += ":two:";
              break;
            case 3:
              showGameBoard += ":three:";
              break;
            case 4:
              showGameBoard += ":four:";
              break;
            case 5:
              showGameBoard += ":five:";
              break;
            case 6:
              showGameBoard += ":six:";
              break;
            case 7:
              showGameBoard += ":seven:";
              break;
            case 8:
              showGameBoard += ":eight:";
              break;
            case -1:
            case 0:
              showGameBoard += "🟦";
              break;
            case -2:
              showGameBoard += "⬜";
              break;
          }
        }
        showGameBoard += "\n";
      }
      return showGameBoard;
    }
    function ShowBombs(gameBoard) {
      let showGameBoard = "**You lost!**\n\n🔲";
      let letras = [
        ":regional_indicator_a:",
        ":regional_indicator_b:",
        ":regional_indicator_c:",
        ":regional_indicator_d:",
        ":regional_indicator_e:",
        ":regional_indicator_f:",
        ":regional_indicator_g:",
        ":regional_indicator_h:",
        ":regional_indicator_i:",
        ":regional_indicator_j:",
      ];
      for (let i = 0; i < letras.length; i++) {
        showGameBoard += letras[i];
      }
      showGameBoard += "\n";
      for (let x = 0; x < WIDTH; x++) {
        showGameBoard += letras[x];
        for (let y = 0; y < HEIGHT; y++) {
          switch (gameBoard[x][y]) {
            case -12:
              showGameBoard += "❌";
              break;
            case -11:
              showGameBoard += "🚩";
              break;
            case 1:
              showGameBoard += ":one:";
              break;
            case 2:
              showGameBoard += ":two:";
              break;
            case 3:
              showGameBoard += ":three:";
              break;
            case 4:
              showGameBoard += ":four:";
              break;
            case 5:
              showGameBoard += ":five:";
              break;
            case 6:
              showGameBoard += ":six:";
              break;
            case 7:
              showGameBoard += ":seven:";
              break;
            case 8:
              showGameBoard += ":eight:";
              break;
            case -1:
              showGameBoard += "💣";
              break;
            case 0:
              showGameBoard += "🟦";
              break;
            case -2:
              showGameBoard += "⬜";
              break;
          }
        }
        showGameBoard += "\n";
      }
      return showGameBoard;
    }

    const minesweeperEmbed = new MessageEmbed()
      .setTitle("Minesweeper")
      .setTimestamp()
      .setDescription(ShowGame(this.bombsFlags, this.gameBoard))
      .addField(
        "How to play?",
        "> First you click what will be your action:\n> • 🚩 To put a flag\n> • 🎲 To reveal the square\n> The input order is (y x):\n> • Example: a j (It will play on top right square)\n> ⏱ You have 5 min's."
      )
      .setColor("BLUE");
    msg.inlineReply(minesweeperEmbed).then((msg) => {
      async function remove() {
        const userReactions = msg.reactions.cache.filter((reaction) =>
          reaction.users.cache.has(id)
        );
        try {
          for (const reaction of userReactions.values()) {
            await reaction.users.remove(id);
          }
        } catch (error) {
          console.error("Failed to remove reactions.");
        }
      }

      function open(y, x, gameBoard) {
        if (
          y < 0 ||
          x < 0 ||
          x > WIDTH - 1 ||
          y > HEIGHT - 1 ||
          gameBoard[y][x] != 0
        )
          return;
        let bombs = 0;
        for (let i = y - 1; i <= y + 1; i++) {
          for (let j = x - 1; j <= x + 1; j++) {
            if (
              !(j < 0 || i < 0 || j > WIDTH - 1 || i > HEIGHT - 1) &&
              (gameBoard[i][j] == -1 || gameBoard[i][j] == -11)
            )
              bombs++;
          }
        }
        if (bombs == 0) {
          gameBoard[y][x] = -2;
          for (let i = y - 1; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
              if (!(j < 0 || i < 0 || j > WIDTH - 1 || i > HEIGHT - 1))
                if (i != y || j != x) open(i, j, gameBoard);
            }
          }
        } else gameBoard[y][x] = bombs;
      }

      msg.react("🚩").then((r) => {
        msg.react("🎲");

        const flagFilter = (reaction, user) =>
          reaction.emoji.name === "🚩" && user.id === id;
        const playFilter = (reaction, user) =>
          reaction.emoji.name === "🎲" && user.id === id;
        const flag = msg.createReactionCollector(flagFilter, {
          time: 5 * 60 * 1000,
        });
        const play = msg.createReactionCollector(playFilter, {
          time: 5 * 60 * 1000,
        });

        flag.on("collect", (r) => {
          msg.channel
            .awaitMessages((response) => response.author.id == id, {
              max: 1,
              time: 5 * 60 * 1000,
              errors: ["time"],
            })
            .then((collected) => {
              const content = collected.first().content.trim().toLowerCase();
              const locations = GetXY(content.split(" "));
              const x = locations.x;
              const y = locations.y;
              if (x == -1 || y == -1) {
                collected
                  .first()
                  .inlineReply("You can't play in that square")
                  .then((m) => {
                    m.delete({ timeout: 5000 });
                  });
                return collected.first().delete({ timeout: 5000 });
              }

              switch (this.gameBoard[y][x]) {
                case 0:
                  this.gameBoard[y][x] = -12;
                  this.bombsFlags--;
                  break;
                case -12:
                  this.gameBoard[y][x] = 0;
                  this.bombsFlags++;
                  break;
                case -11:
                  this.gameBoard[y][x] = -1;
                  this.bombsFlags++;
                  break;
                case -1:
                  this.gameBoard[y][x] = -11;
                  this.bombsFlags--;
                  break;
              }

              collected.first().delete();
              minesweeperEmbed.setDescription(
                ShowGame(this.bombsFlags, this.gameBoard)
              );
              msg.edit(minesweeperEmbed);
            });
          remove();
          return;
        });

        flag.on("end", (collected, reason) => {
          console.log("end");
          if (!verifyWin(this.gameBoard)) {
            minesweeperEmbed.setDescription(
              "**[Timeout]** " + ShowBombs(this.gameBoard)
            );
            msg.edit(minesweeperEmbed);
            msg.reactions.removeAll();
          }
        });

        play.on("collect", (r) => {
          msg.channel
            .awaitMessages((response) => response.author.id == id, {
              max: 1,
              time: 5 * 60 * 1000,
              errors: ["time"],
            })
            .then((collected) => {
              const content = collected.first().content.trim().toLowerCase();
              const locations = GetXY(content.split(" "));
              const x = locations.x;
              const y = locations.y;
              if (x == -1 || y == -1) {
                collected
                  .first()
                  .inlineReply("You can't play in that square")
                  .then((m) => {
                    m.delete({ timeout: 5000 });
                  });
                return collected.first().delete({ timeout: 5000 });
              }
              if (this.gameBoard[parseInt(y)][parseInt(x)] == -1) {
                collected.first().delete();
                minesweeperEmbed.setDescription(ShowBombs(this.gameBoard));
                msg.edit(minesweeperEmbed);
                msg.reactions.removeAll();
              } else {
                open(parseInt(y), parseInt(x), this.gameBoard);
                if (verifyWin(this.gameBoard)) {
                  collected.first().delete();
                  minesweeperEmbed.setDescription(
                    "**You Win!** 😎\n\n" +
                      ShowGame(this.bombsFlags, this.gameBoard)
                  );
                  msg.edit(minesweeperEmbed);
                  msg.reactions.removeAll();
                } else {
                  collected.first().delete();
                  minesweeperEmbed.setDescription(
                    ShowGame(this.bombsFlags, this.gameBoard)
                  );
                  msg.edit(minesweeperEmbed);
                }
              }
            });
          remove();
        });
      });
    });
  }
}

module.exports = {
  minesweeper,
};
