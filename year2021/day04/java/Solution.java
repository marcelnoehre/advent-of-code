import java.nio.file.*;
import java.util.*;

public class Solution {
    private static int[] NUMBERS;
    private static int[][][] BOARDS;

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
        Set<Integer> marked = new HashSet<>();
        for (int num : NUMBERS) {
            marked.add(num);
            for (int[][] board : BOARDS) {
                if (containsMarkedRows(board, marked) || containsMarkedColumns(board, marked)) {
                    return num * calculateSum(board, marked);
                }
            }
        }
        return -1;
    }
    
    public static int part2() {
        Set<Integer> won = new HashSet<>();
        Set<Integer> marked = new HashSet<>();
        for (int num : NUMBERS) {
            marked.add(num);
            for (int i = 0; i < BOARDS.length; i++) {
                if (won.contains(i)) {
                    continue;
                }
                int[][] b = BOARDS[i];
                if (containsMarkedRows(b, marked) || containsMarkedColumns(b, marked)) {
                    won.add(i);
                    if (won.size() == BOARDS.length) {
                        return num * calculateSum(b, marked);
                    }
                }
            }
        }
        return -1;
    }

    public static void setup(String input) {
        NUMBERS = Arrays.stream(input.split("\n\n")[0].trim().split(","))
                .mapToInt(Integer::parseInt)
                .toArray();
        BOARDS = Arrays.stream(Arrays.copyOfRange(input.split("\n\n"), 1, input.split("\n\n").length))
                .map(board -> Arrays.stream(board.trim().split("\\n"))
                .map(row -> Arrays.stream(row.trim().split("\\s+"))
                .mapToInt(Integer::parseInt)
                .toArray())
                .toArray(int[][]::new))
                .toArray(int[][][]::new);   
    }

    private static boolean containsMarkedRows(int[][] board, Set<Integer> marked) {
        for (int[] row : board) {
            if (containsMarked(row, marked)) {
                return true;
            }
        }
        return false;
    }

    private static boolean containsMarkedColumns(int[][] board, Set<Integer> marked) {
        for (int columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
            int[] column = new int[board.length];
            for (int rowIndex = 0; rowIndex < board.length; rowIndex++) {
                column[rowIndex] = board[rowIndex][columnIndex];
            }
            if (containsMarked(column, marked)) {
                return true;
            }
        }
        return false;
    }

    private static boolean containsMarked(int[] array, Set<Integer> marked) {
        for (int x : array) {
            if (!marked.contains(x)) {
                return false;
            }
        }
        return true;
    }

    private static int calculateSum(int[][] board, Set<Integer> marked) {
        int sum = 0;
        for (int[] row : board) {
            for (int x : row) {
                if (!marked.contains(x)) {
                    sum += x;
                }
            }
        }
        return sum;
    }
}