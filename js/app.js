document.addEventListener("DOMContentLoaded", function () {

    function Furry() {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    };


    function Coin() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    };


    function Game() {
        var self = this;

        this.board = document.querySelectorAll('#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;

        // console.log(this.furry);
        // console.log(this.coin);

        this.index = function (x, y) {
            return x + (y * 10);
        };

        this.showFurry = function () {
            this.hideVisibleFurry();
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        };

        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };

        this.moveFury = function () {
            if (self.furry.direction === "right") {
                self.furry.x++;
            } else if (self.furry.direction === "left") {
                self.furry.x--;
            } else if (self.furry.direction === "up") {
                self.furry.y--;
            } else if (self.furry.direction === "down") {
                self.furry.y++;
            }
            if (!self.gameOver()) {
                self.showFurry();
                self.checkCoinCollision();
            }
        }

        this.hideVisibleCoin = function () {
            var coin = document.querySelector('.coin');
            if (coin) {
                coin.classList.remove('coin');
            }
        }

        this.hideVisibleFurry = function () {
            var furry = document.querySelector('.furry');
            if (furry) {
                furry.classList.remove("furry");
            }
        }

        this.startGame = function () {
            this.setInterval = setInterval(this.moveFury, 250);
        }

        this.turnFurry = function (e) {
            switch (e.keyCode) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'up';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'down';
                    break;
            }
        }

        this.checkCoinCollision = function () {
            if (self.furry.x === self.coin.x && self.furry.y === self.coin.y) {
                console.log('Ai pierdut! Incepe un nou joc!');
                this.score++;
                this.hideVisibleCoin();
                this.coin = new Coin();
                this.showCoin();
                document.querySelector('#score strong').innerText = this.score;
            }
        }

        this.gameOver = function () {
            if (this.furry.x >= 10 || this.furry.x < 0 || this.furry.y < 0 || this.furry.y >= 10) {
                clearInterval(this.setInterval);
                this.hideVisibleFurry();
                if (confirm('Sfarsitul jocului! Vrei sa te joci din nou?')) {
                    document.location.reload();
                }
                return true;
            }
            return false;
        }
    }

    var game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();

    document.addEventListener('keydown', function (event) {
        event.preventDefault();
        game.turnFurry(event);
    });

});
