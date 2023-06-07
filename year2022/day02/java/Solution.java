package year2022.day02.java;

import java.nio.file.*;
import java.util.*;

public class Solution {
    private static List<RPS[]> MATCHES = new ArrayList<RPS[]>();
    
    public static void main(String[] args) { 
        try {
            setMatches(Files.readAllLines(Paths.get("../puzzle.txt")));
            System.out.println(part1());
            System.out.println(part2());
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
    private static Integer part1() {
        int score = 0;
        for(RPS[] match : MATCHES) {
            score += round(match[0], match[1]);
        }
        return score;
    }
    
    private static Integer part2() {
        int score = 0;
        for(RPS[] match : MATCHES) {
            score += forcedRound(match[0], match[1]);
        }
        return score;
    }
    
    private static void setMatches(List<String> input) {
        for(String match : input) {
            MATCHES.add(new RPS[] {
                RPS.valueOf(String.valueOf(match.charAt(0))),
                RPS.valueOf(String.valueOf(match.charAt(2)))
            });
        }
    }
    
    private static int round(RPS elf, RPS player) {
        if(player.shape.equals(elf.shape)) {
            return 3 + player.score;
        }
        switch(player.shape) {
        case "Rock":
            if(elf.shape.equals("Scissors")) {
                return 6 + player.score;
            }
            break;
        case "Paper":
            if(elf.shape.equals("Rock")) {
                return 6 + player.score;
            }
            break;
        case "Scissors":
            if(elf.shape.equals("Paper")) {
                return 6 + player.score;
            }
            break;
        }
        return player.score;
    }
    
    private static int forcedRound(RPS elf, RPS player) {
        if (player.result.equals("Win")) {
            return 6 + ((elf.score + 1) % 3 == 0 ? 3 : (elf.score + 1) % 3);
        } else if (player.result.equals("Loss")) {
            return elf.score - 1 >= 1 ? elf.score - 1 : 3;
        } else {
            return 3 + elf.score;
        }
    }
    
    private enum RPS {
        A("Rock", 1, "Loss"),
        B("Paper", 2, "Draw"),
        C("Scissors", 3, "Win"),
        X("Rock", 1, "Loss"),
        Y("Paper", 2, "Draw"),
        Z("Scissors", 3, "Win");
        
        String shape;
        int score;
        String result;
        
        RPS(String shape, int score, String result) {
            this.shape = shape;
            this.score = score;
            this.result = result;
        }
    }
}