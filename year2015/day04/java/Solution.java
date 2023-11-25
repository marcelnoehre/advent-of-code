import java.nio.file.*;
import java.util.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Solution {
  private static String HASH;

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
    return mine(5);
  }

  public static int part2() {
    return mine(6);
  }

  private static int mine(int digits) {
    int counter = 0;
    try {
      while (true) {
        StringBuilder hashStringBuilder = new StringBuilder();
        for (byte b : MessageDigest.getInstance("MD5").digest((HASH + counter).getBytes())) {
          hashStringBuilder.append(String.format("%02x", b));
        }
        if (hashStringBuilder.toString().startsWith("0".repeat(digits))) {
          break;
        }
        counter++;
      }
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
    return counter;
  }

  public static void setup(String input) {
    HASH = input;
  }
}