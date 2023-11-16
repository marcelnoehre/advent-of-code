import java.nio.file.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) { 
        try {
            setup(Files.readString(Paths.get("../puzzle.txt")));
            System.out.println(part1());
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
	public static int part1() {
        return -1;
    }

    public static void setup(String input) {
        
    }
}