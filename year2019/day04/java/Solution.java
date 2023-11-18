import java.nio.file.*;
import java.util.*;

public class Solution {
    private static int[] TUPEL;

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
        for (int i = TUPEL[0]; i <= TUPEL[1]; i++) {
            if (containsPairOfIdenticalDigits(Integer.toString(i)) && isNonDecreasing(Integer.toString(i))) {
                sum++;
            }
        }

        return sum;
    }
    
    public static int part2() {
        int sum = 0;
        for (int i = TUPEL[0]; i <= TUPEL[1]; i++) {
            if (isSortedAndContainsExactDouble(Integer.toString(i))) {
                sum++;
            }
        }
        return sum;
    }

    public static void setup(String input) {
        TUPEL = Arrays.stream(input.split("-")).mapToInt(Integer::parseInt).toArray();
    }

    private static boolean containsPairOfIdenticalDigits(String number) {
        for (int i = 0; i < number.length() - 1; i++) {
            if (number.charAt(i) == number.charAt(i + 1)) {
                return true;
            }
        }
        return false;
    }

    private static boolean isNonDecreasing(String number) {
        for (int i = 0; i < number.length() - 1; i++) {
            if (number.charAt(i) > number.charAt(i + 1)) {
                return false;
            }
        }
        return true;
    }

    private static boolean isSortedAndContainsExactDouble(String number) {
        boolean hasExactDouble = false;
        for (int i = 0; i < number.length() - 1; i++) {
            if (number.charAt(i) > number.charAt(i + 1)) {
                return false;
            }
            if (number.charAt(i) == number.charAt(i + 1)) {
                if (i + 2 < number.length()) {
                    if (number.charAt(i + 2) != number.charAt(i)) {
                        if (i - 1 >= 0 && number.charAt(i - 1) == number.charAt(i)) {
                            continue;
                        }
                        hasExactDouble = true;
                    }
                } else {
                    if (i - 1 >= 0 && number.charAt(i - 1) != number.charAt(i)) {
                        hasExactDouble = true;
                    }
                }
            }
        }
        return hasExactDouble;
    }
}