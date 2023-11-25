import java.nio.file.*;
import java.util.*;

public class Solution {
  private static String[] BINARIES;

  public static void main(String[] args) {
    try {
      setup(Files.readString(Paths.get("../puzzle.txt")));
      System.out.println(part1());
      System.out.println(part2());
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

	public static Integer part1() {
    String gamma = "";
    String epsilon = "";
    for(int i = 0; i < BINARIES[0].length(); i++) {
      int counter = 0;
      for(String binary : BINARIES) {
        counter += binary.charAt(i) == '0' ? 1 : 0;
      }
      gamma += counter > BINARIES.length / 2 ? "0" : "1";
      epsilon += counter > BINARIES.length / 2 ? "1" : "0";
    }
    return Integer.parseInt(gamma, 2) * Integer.parseInt(epsilon, 2);
  }

  public static int part2() {
    String[] oxygen = BINARIES;
    String[] co2 = BINARIES;
    for(int i = 0; i < BINARIES[0].length(); i++) {
      if(oxygen.length > 1) {
        int counter = 0;
        for(String binary : oxygen) {
          counter += binary.charAt(i) == '1' ? 1 : 0;
        }
        char cbit = counter >= oxygen.length / 2.0 ? '1' : '0';
        List<String> filtered = new ArrayList<String>();
        for(String ox : oxygen) {
          if(ox.charAt(i) == cbit) {
            filtered.add(ox);
          }
        }
        oxygen = filtered.toArray(new String[0]);
      }
      if(co2.length > 1) {
        int counter = 0;
        for(String binary : co2) {
          counter += binary.charAt(i) == '1' ? 0 : 1;
        }
        char cbit = counter > co2.length / 2 ? '1' : '0';
        List<String> filtered = new ArrayList<String>();
        for(String c : co2) {
          if(c.charAt(i) == cbit) {
            filtered.add(c);
          }
        }
        co2 = filtered.toArray(new String[0]);
      }
    }
    return Integer.parseInt(oxygen[0], 2) * Integer.parseInt(co2[0], 2);
  }

  public static void setup(String input) {
    BINARIES = input.split("\n");
  }
}