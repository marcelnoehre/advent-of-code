import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

public class Solution {
  private static List<Coordinates> COORDINATES;

  public static void main(String[] args) {
    try {
      setup(Files.readAllLines(Paths.get("../puzzle.txt")));
      System.out.println(part1());
      System.out.println(part2());
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

	public static int part1() {
    Map<String, Integer> field = new HashMap<>();
    COORDINATES.stream()
        .filter(command -> command.x1 == command.x2 || command.y1 == command.y2)
        .collect(Collectors.toList())
        .forEach(command -> calcField(command, field));
    return (int) field.entrySet().stream().filter(entry -> entry.getValue() >= 2).count();
  }

  public static int part2() {
    Map<String, Integer> field = new HashMap<>();
    COORDINATES.stream()
        .filter(command -> command.x1 == command.x2 || command.y1 == command.y2)
        .collect(Collectors.toList())
        .addAll(COORDINATES.stream().filter(command -> Math.abs(command.x1 - command.x2) == Math.abs(command.y1 - command.y2))
        .collect(Collectors.toList()));
    COORDINATES.forEach(command -> calcField(command, field));
    return (int) field.entrySet().stream().filter(entry -> entry.getValue() >= 2).count();
  }

  public static void setup(List<String> input) {
    COORDINATES = input.stream().map(Coordinates::createFromInput).collect(Collectors.toList());
  }

  private static void calcField(Coordinates coordinates, Map<String, Integer> field) {
    int startX = coordinates.x1;
    int startY = coordinates.y1;
    int endX = coordinates.x2;
    int endY = coordinates.y2;
    for (int i = 0; i <= Math.max(Math.abs(endX - startX), Math.abs(endY - startY)); i++) {
      field.merge((startX + i * Integer.compare(endX, startX)) + "," + (startY + i * Integer.compare(endY, startY)), 1, Integer::sum);
    }
  }

}

class Coordinates {
  public int x1, x2, y1, y2;

  public Coordinates(int x1, int x2, int y1, int y2) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }

  public static Coordinates createFromInput(String inputLine) {
    String[] splitted = inputLine.split("->");
    String[] from = splitted[0].trim().split(",");
    String[] to = splitted[1].trim().split(",");
    return new Coordinates(Integer.parseInt(from[0]), Integer.parseInt(to[0]), Integer.parseInt(from[1]), Integer.parseInt(to[1]));
  }

  @Override
  public String toString() {
    return "Command{" + x1 + "," + y1 + " -> " + x2 + "," + y2 + '}';
  }
}