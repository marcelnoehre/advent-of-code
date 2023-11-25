import java.nio.file.*;
import java.util.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Solution {
  private static String PASSWORD;

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
    int i = 0;
    String pw = "";
    while(pw.length() < 8) {
      String h = md5Hash(PASSWORD + i++);
      if (h.startsWith("00000")) {
        pw += h.charAt(5);
      }
    }
    return pw;
  }

  public static String part2() {
    char[] pw = new char[8];
    Arrays.fill(pw, '_');
    for (int i = 0; new String(pw).contains("_"); i++) {
      String hash = md5Hash(PASSWORD + i);
      if (hash.startsWith("00000")) {
        int index = Character.getNumericValue(hash.charAt(5));
        if (index >= 0 && index < 8 && pw[index] == '_') {
          pw[index] = hash.charAt(6);
        }
      }
    }
    return new String(pw);
  }

  public static void setup(String input) {
    PASSWORD = input;
  }

  private static String md5Hash(String input) {
    try {
      MessageDigest md = MessageDigest.getInstance("MD5");
      byte[] messageDigest = md.digest(input.getBytes());
      StringBuilder hexString = new StringBuilder();
      for (byte b : messageDigest) {
        String hex = Integer.toHexString(0xff & b);
        if (hex.length() == 1) {
          hexString.append('0');
        }
        hexString.append(hex);
      }
      return hexString.toString();
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException("MD5 algorithm not available", e);
    }
  }
}