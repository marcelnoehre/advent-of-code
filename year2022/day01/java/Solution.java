package year2022.day01.java;

import java.nio.file.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) { 
        try {
            List<String> puzzle = Files.readAllLines(Paths.get("../puzzle.txt"));
            System.out.println(part1(puzzle));
            System.out.println(part2(puzzle));
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
	private static Integer part1(List<String> input) {
    	Map<Integer, Integer> elfs = new HashMap<Integer, Integer>();
    	int elf = 1;
    	int sum = 0;
    	for(String calory : input) {
    		if(calory.isBlank()) {
    			elfs.put(elf, sum);
                sum = 0;
                elf++;
    		} else {
    			sum += Integer.parseInt(calory);
    		}
    	}
        return Collections.max(elfs.values());
    }
    
    private static Integer part2(List<String> input) {
    	Map<Integer, Integer> elfs = new HashMap<Integer, Integer>();
    	int elf = 1;
    	int sum = 0;
    	for(String calory : input) {
    		if(calory.isBlank()) {
    			elfs.put(elf, sum);
                sum = 0;
                elf++;
    		} else {
    			sum += Integer.parseInt(calory);
    		}
    	}
        return elfs.values().stream().sorted(Collections.reverseOrder()).limit(3).mapToInt(Integer::intValue).sum();
    }
}