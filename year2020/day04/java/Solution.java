import java.nio.file.*;
import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

public class Solution {
  private static String[][] PASSPORTS;
  private static List<String> REQUIRED = Arrays.asList("byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid");

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
    return (int) Arrays.stream(PASSPORTS)
        .filter(passport -> REQUIRED.stream()
        .allMatch(field -> Arrays.stream(passport)
        .map(seq -> seq.split(":")[0])
        .collect(Collectors.toSet())
        .contains(field)))
        .count();
  }

  public static int part2() {
    return (int) Arrays.stream(PASSPORTS).filter(passport -> validate(parsePassportFields(passport))).count();
  }

  public static void setup(String input) {
    PASSPORTS = Arrays.stream(input.split("\n\n")).map(passport -> passport.split("\\s+")).toArray(String[][]::new);
  }

  private static Map<String, String> parsePassportFields(String[] passport) {
    Map<String, String> dict = new HashMap<>();
    for (String field : passport) {
      String[] splitField = field.split(":");
      dict.put(splitField[0], splitField.length > 1 ? splitField[1] : null);
    }
    return dict;
  }

  private static boolean validate(Map<String, String> dict) {
    try {
      if (!(dict.containsKey("byr") && 1920 <= Integer.parseInt(dict.get("byr")) && Integer.parseInt(dict.get("byr")) <= 2002))
        return false;
      if (!(dict.containsKey("iyr") && 2010 <= Integer.parseInt(dict.get("iyr")) && Integer.parseInt(dict.get("iyr")) <= 2020))
        return false;
      if (!(dict.containsKey("eyr") && 2020 <= Integer.parseInt(dict.get("eyr")) && Integer.parseInt(dict.get("eyr")) <= 2030))
        return false;
      if (!(dict.containsKey("hcl") && Pattern.matches("^#[0-9a-f]{6}$", dict.get("hcl"))))
        return false;
      if (!(dict.containsKey("ecl") && Arrays.asList("amb", "blu", "brn", "gry", "grn", "hzl", "oth").contains(dict.get("ecl"))))
        return false;
      if (!(dict.containsKey("pid") && Pattern.matches("^\\d{9}$", dict.get("pid"))))
        return false;

      if (dict.containsKey("hgt")) {
        String hgt = dict.get("hgt");
        int height = Integer.parseInt(hgt.replaceAll("[^0-9]", ""));
        if (hgt.endsWith("cm") && (150 <= height && height <= 193))
          return true;
        if (hgt.endsWith("in") && (59 <= height && height <= 76))
          return true;
      }

    } catch (NumberFormatException e) {
      return false;
    }

    return false;
  }
}