package assets.templates.java;

import java.nio.file.Files;
import java.nio.file.Paths;

public class Solution {
    public static void main(String[] args) { 
        try {
            String puzzle = new String(Files.readAllBytes(Paths.get("../puzzle.txt")));
            System.out.println(part1(puzzle));
            System.out.println(part2(puzzle));
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
    private static String part1(String input) {
        return null;
    }
    
    private static String part2(String input) {
        return null;
    }
}