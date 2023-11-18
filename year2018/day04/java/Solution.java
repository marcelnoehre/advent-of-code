import java.nio.file.*;
import java.util.*;
import java.util.regex.*;

public class Solution {
    private static Map<Integer, int[]> RECORDS = new HashMap<>();

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
        int sGuard = 0;
        int sTotal = 0;
        for (Map.Entry<Integer, int[]> entry : RECORDS.entrySet()) {
            int guard = entry.getKey();
            int[] record = entry.getValue();
            int sum = 0;
            for (int value : record) {
                sum += value;
            }
            if (sum > sTotal) {
                sGuard = guard;
                sTotal = sum;
            }
        }
        int sMin = 0;
        int[] sRecord = RECORDS.get(sGuard);
        for (int minute = 0; minute < 60; minute++) {
            if (sRecord[minute] > sRecord[sMin]) {
                sMin = minute;
            }
        }
        return sGuard * sMin;
    }
    
    public static int part2() {
        int sleepiestMinute = 0;
        int sleepiestFrequency = 0;
        int sleepiestGuard = 0;
        for (Map.Entry<Integer, int[]> entry : RECORDS.entrySet()) {
            int guard = entry.getKey();
            int[] record = entry.getValue();
            for (int minute = 0; minute < 60; minute++) {
                if (record[minute] > sleepiestFrequency) {
                    sleepiestMinute = minute;
                    sleepiestFrequency = record[minute];
                    sleepiestGuard = guard;
                }
            }
        }
        return sleepiestGuard * sleepiestMinute;
    }

    public static void setup(String input) {
        String[] lines = input.split("\n");
        Arrays.sort(lines);
        int currentGuard = 0;
        int sleepStart = 0;
        for (String line : lines) {
            Pattern pattern = Pattern.compile("^\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:(\\d{2})\\] (?:Guard #(\\d+) begins shift|(falls asleep)|(wakes up))$");
            Matcher matcher = pattern.matcher(line);
            if (matcher.find()) {
                String minute = matcher.group(1);
                String guard = matcher.group(2);
                String fallsAsleep = matcher.group(3);
                String wakesUp = matcher.group(4);
                if (guard != null) {
                    currentGuard = Integer.parseInt(guard);
                    if (!RECORDS.containsKey(currentGuard)) {
                        RECORDS.put(currentGuard, new int[60]);
                    }
                }
                if (fallsAsleep != null) {
                    sleepStart = Integer.parseInt(minute);
                }
                if (wakesUp != null) {
                    for (int i = sleepStart; i < Integer.parseInt(minute); i++) {
                        int[] guardRecords = RECORDS.get(currentGuard);
                        guardRecords[i] = (guardRecords[i] + 1);
                    }
                }
            }
        }
    }
}