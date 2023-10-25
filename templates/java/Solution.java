package yearYYYY.dayDD.java;

import java.nio.file.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) { 
        try {
            Files.readAllLines(Paths.get("../example.txt"));
            System.out.println(part1());
            System.out.println(part2());
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
	private static Integer part1() {
        return null;
    }
    
    private static Integer part2() {
        return null;
    }
}