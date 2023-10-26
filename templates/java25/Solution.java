package yearYYYY.dayDD.java;

import java.nio.file.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) { 
        try {
            Files.readAllLines(Paths.get("../example.txt"));
            System.out.println(part1());
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
	private static Integer part1() {
        return null;
    }
}