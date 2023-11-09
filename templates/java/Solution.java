import java.nio.file.*;
import java.util.*;

public class Solution {
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
        return null;
    }
    
    public static Integer part2() {
        return null;
    }

    public static void setup() {
        
    }
}