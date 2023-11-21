import java.nio.file.*;
import java.util.*;

public class Solution {
    private static List<List<Integer>> SPREADSHEET = new ArrayList<>();

    public static void main(String[] args) { 
        try {
            setup(Files.readString(Paths.get("../puzzle.txt")));
            System.out.println(part1());
            System.out.println(part2());
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
	public static int part1() {
        int sum = 0;
        for (List<Integer> row : SPREADSHEET) {
            int max = Integer.MIN_VALUE;
            int min = Integer.MAX_VALUE;
            for (int num : row) {
                max = Math.max(max, num);
                min = Math.min(min, num);
            }
            sum += (max - min);
        }
        return sum;
    }
    
    public static int part2() {
        int sum = 0;
        for (List<Integer> row : SPREADSHEET) {
            int div = 0;
            int num = 0;
            loop:
            for (int i = 0; i < row.size(); i++) {
                for (int j = 0; j < row.size(); j++) {
                    if (i != j && row.get(j) != 0 && row.get(i) % row.get(j) == 0) {
                        div = row.get(i);
                        num = row.get(j);
                        break loop;
                    }
                }
            }
            sum += (div / num);
        }
        return sum;
    }

    public static void setup(String input) {
        for (String row : input.split("\n")) {
            List<Integer> ROW = new ArrayList<>();
            for(String num : row.split("\t")) {
                ROW.add(Integer.parseInt(num));
            }
            SPREADSHEET.add(ROW);
        }
    }
}