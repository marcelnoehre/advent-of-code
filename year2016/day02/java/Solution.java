import java.nio.file.*;
import java.util.*;

public class Solution {
  private static String[] SEQUENCES;
  private static int[][] NUMPAD = {{1, 2, 3},{4, 5, 6},{7, 8, 9}};
  private static String[][] keyPad = {{null, null, "1", null, null},{null, "2", "3", "4", null},{"5", "6", "7", "8", "9"},{null, "A", "B", "C", null},{null, null, "D", null, null}};

  public static void main(String[] args) {
    try {
      setup(Files.readString(Paths.get("../puzzle.txt")));
      System.out.println(part1());
      System.out.println(part2());
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

	public static String part1() {
    int column = 1;
    int row = 1;
    List<Integer> seq = new ArrayList<>();

    for (String s : SEQUENCES) {
      int[] computed = computeNumber(column, row, s);
      seq.add(computed[0]);
      row = computed[1];
      column = computed[2];
    }

    String pw = "";
    for (int num : seq) {
      pw += num;
    }

    return pw;
  }

  public static String part2() {
    int column = 0;
    int row = 2;
    List<String> seq = new ArrayList<>();

    for (String s : SEQUENCES) {
      List<Object> computed = computeKey(column, row, s);
      seq.add((String) computed.get(0));
      row = (int) computed.get(1);
      column = (int) computed.get(2);
    }

    String pw = "";
    for (String charackter : seq) {
      pw += charackter;
    }

    return pw;
  }

  public static void setup(String input) {
    SEQUENCES = input.split("\n");
  }

  private static int[] computeNumber(int row, int column, String instructions) {
    for (int i = 0; i < instructions.length(); ++i) {
      switch (instructions.charAt(i)) {
        case 'U':
          if (row != 0)
            --row;
          break;

        case 'D':
          if (row != 2)
            ++row;
          break;

        case 'L':
          if (column != 0)
            --column;
          break;

        case 'R':
          if (column != 2)
            ++column;
          break;
      }
    }

    return new int[] {NUMPAD[row][column], row, column};
  }

  private static List<Object> computeKey(int row, int column, String instructions) {
    for (int i = 0; i < instructions.length(); ++i) {
      switch (instructions.charAt(i)) {
        case 'U':
          if (row != 0 && keyPad[row - 1][column] != null)
            --row;
          break;
        case 'D':
          if (row != 4 && keyPad[row + 1][column] != null)
            ++row;
          break;
        case 'L':
          if (column != 0 && keyPad[row][column - 1] != null)
            --column;
          break;
        case 'R':
          if (column != 4 && keyPad[row][column + 1] != null)
            ++column;
          break;
      }
    }

    return Arrays.asList(keyPad[row][column], row, column);
  }
}