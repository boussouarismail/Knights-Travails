
import _ from "lodash";
import printMe from "./print.js";
import "./style.css";
//import path from "path";

class Square {
    constructor(d=[], p={})
    {
        this.pre = p;
        this.data = d;
        this.moves = [];
    }
}

class Paths {
    constructor(){
        this.root = new Square();
    }
}

class Board {
    constructor(){
        this.board = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ]
    }
}

class knight {
    constructor(){
        this.paths = new Square();
    }
    possibleMoves (startPosition = [0, 0]){
        let endPositions = [
            [startPosition[0]+1, startPosition[1]+2],
            [startPosition[0]+2, startPosition[1]+1],
            [startPosition[0]-1, startPosition[1]-2],
            [startPosition[0]-2, startPosition[1]-1],
            [startPosition[0]+1, startPosition[1]-2],
            [startPosition[0]+2, startPosition[1]-1],
            [startPosition[0]-1, startPosition[1]+2],
            [startPosition[0]-2, startPosition[1]+1]
        ];
        return endPositions;  
    }

    knightMoves (startPosition, endPosition, tree = this.paths){
        tree.data = startPosition;
        tree.pre = undefined;
        let array = [tree];        

        if (endPosition[0] < 0 || 
            endPosition[0] > 7 || 
            endPosition[1] < 0 || 
            endPosition[1] > 7 ) {
            console.log("enter a valid position");
            return [];
        }

        if (startPosition[0] === endPosition[0] && startPosition[1] === endPosition[1]) {
            console.log("bingoooooo");
            return endPosition;
        }
        let moves = this.possibleMoves(startPosition);
        
        newBoard.board[startPosition[0]][startPosition[1]] = 1;
        moves = this.checkVAlidMoves(moves, newBoard);
            for (let i = 0; i < moves.length; i++) {
                tree.moves[i] = new Square(moves[i], tree);
                array.push(tree.moves[i]);
            }  
            array.shift();
        return this.find(this.levelOrderInsertion(array, endPosition));
          
    }

    find (position) {
        if (!position.pre) {
            return[position.data] 
        }
        return this.find(position.pre).concat([position.data]);
    }

    levelOrderInsertion(array, endPosition){
        
        while (array[0]) {
            
            if (array[0].data[0] == endPosition[0] && array[0].data[1] == endPosition[1]) {
                console.log("bingo"); 
                return array[0]; 
            }
            let moves = this.possibleMoves(array[0].data);
            newBoard.board[array[0].data[0]][array[0].data[1]] = 1;
            moves = this.checkVAlidMoves(moves, newBoard);
            for (let i = 0; i < moves.length; i++) {
                array[0].moves[i] = new Square(moves[i], array[0]);
                array.push(array[0].moves[i]);
                //console.log(array[0].data);
            }  
            array.shift();
        }
    }

    checkVAlidMoves(moves, board) {
        for (let i = 0; i < moves.length; i++) {
            if (moves[i][0] < 0 || moves[i][0] > 7 || moves[i][1] < 0 || moves[i][1] > 7) {
                moves.splice(i, 1);//possible move out of range
                i--;
            }            
        }  
        for (let i = 0; i < moves.length; i++) {
            if (board.board[moves[i][0]][moves[i][1]] == 1) {
                moves.splice(i, 1);// possible move make a loop
                i--;
            }
        }
        
        return moves;  
    }
}

let myKnight = new knight();
let newBoard = new Board();

console.log(myKnight.knightMoves([3, 3], [6, 0]));

