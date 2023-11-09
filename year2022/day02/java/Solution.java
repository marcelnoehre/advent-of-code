import java.nio.file.*;
import java.util.*;

public class Solution {
    private static List<RPS[]> MATCHES = new ArrayList<RPS[]>();
    
    public static void main(String[] args) { 
        try {
            setup(Files.readAllLines(Paths.get("../puzzle.txt")));
            System.out.println(part1());
            System.out.println(part2());
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
    public static Integer part1() {
        int score = 0;
        for(RPS[] match : MATCHES) {
            score += round(match[0], match[1]);
        }
        return score;
    }
    
    public static Integer part2() {
        int score = 0;
        for(RPS[] match : MATCHES) {
            score += forcedRound(match[0], match[1]);
        }
        return score;
    }
    
    public static void setup(List<String> input) {
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
        case "rock":
            if(elf.shape.equals("scissors")) {
                return 6 + player.score;
            }
            break;
        case "paper":
            if(elf.shape.equals("rock")) {
                return 6 + player.score;
            }
            break;
        case "scissors":
            if(elf.shape.equals("paper")) {
                return 6 + player.score;
            }
            break;
        }
        return player.score;
    }
    
    private static int forcedRound(RPS elf, RPS player) {
        if (player.result.equals("win")) {
            return 6 + ((elf.score + 1) % 3 == 0 ? 3 : (elf.score + 1) % 3);
        } else if (player.result.equals("lose")) {
            return elf.score - 1 >= 1 ? elf.score - 1 : 3;
        } else {
            return 3 + elf.score;
        }
    }
    
    private enum RPS {
        A("rock", 1, "lose"),
        B("paper", 2, "draw"),
        C("scissors", 3, "win"),
        X("rock", 1, "lose"),
        Y("paper", 2, "draw"),
        Z("scissors", 3, "win");
        
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