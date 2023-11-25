import java.nio.file.*;
import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

public class Solution {
  private static List<String[]> DECOYS = new ArrayList<>();

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
    for(String[] room : DECOYS) {
      String cleanedString = sortChars(room[0].replaceAll("-", "")).substring(0, 5);
      String expectedChecksum = room[2];
      sum += cleanedString.equals(expectedChecksum) ? Integer.parseInt(room[1]) : 0;
    }
    return sum;
  }

  public static int part2() {
    Optional<String[]> roomOptional = DECOYS.stream().filter(room -> decryptRoomName(room).contains("north")).findFirst();

    if (roomOptional.isPresent()) {
      return Integer.parseInt(roomOptional.get()[1]);
    } else {
      return -1;
    }
  }

  public static void setup(String input) {
    Pattern pattern = Pattern.compile("^([a-z\\-]+)-(\\d+)\\[([a-z]+)]$");
    for (String line : input.split("\n")) {
      Matcher matcher = pattern.matcher(line);
      if (matcher.matches()) {
        DECOYS.add(new String[]{matcher.group(1), matcher.group(2), matcher.group(3)});
      }
    }
  }

  private static String sortChars(String inputString) {
    Map<Character, Integer> count = new HashMap<>();

    for (char c : inputString.toCharArray()) {
      count.put(c, count.getOrDefault(c, 0) + 1);
    }

    return count.entrySet()
        .stream()
        .sorted((entry1, entry2) -> {
          int countComparison = entry2.getValue().compareTo(entry1.getValue());
          return (countComparison != 0) ? countComparison : Character.compare(entry1.getKey(), entry2.getKey());
        })
        .map(entry -> entry.getKey().toString())
        .collect(Collectors.joining());
  }

  private static String decryptRoomName(String[] room) {
    char[] decryptedChars = room[0].replace("-", " ").toCharArray();

    for (int i = 0; i < decryptedChars.length; i++) {
      if (Character.isAlphabetic(decryptedChars[i])) {
        decryptedChars[i] = (char) ((decryptedChars[i] - 'a' + Integer.parseInt(room[1])) % 26 + 'a');
      }
    }

    return new String(decryptedChars);
  }
}