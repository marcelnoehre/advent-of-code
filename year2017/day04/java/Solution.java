import java.nio.file.*;
import java.util.*;

public class Solution {
    private static List<String[]> PASSPHRASES = new ArrayList<String[]>();

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
        for(String[] passphrase : PASSPHRASES) {
            if (new HashSet<>(Arrays.asList(passphrase)).size() == passphrase.length) {
                sum++;
            }
        }
        return sum;
    }
    
    public static int part2() {
        int sum = 0;
        for(String[] passphrase : PASSPHRASES) {
            for(int i = 0; i < passphrase.length; i++) {
                char[] charArray = passphrase[i].toCharArray();
                Arrays.sort(charArray);
                passphrase[i] = new String(charArray);
            }
            if (new HashSet<>(Arrays.asList(passphrase)).size() == passphrase.length) {
                sum++;
            }
        }
        return sum;
    }

    public static void setup(String input) {
        for(String row : input.split("\n")) {
            PASSPHRASES.add(row.split(" "));
        }
    }
}