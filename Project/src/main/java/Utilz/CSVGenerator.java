package Utilz;

import java.io.*;
import java.util.*;

public class CSVGenerator {
    private static final BufferedReader br;
    private  static final String splitBy = ",";
    private  static final String csvFilePath ="Cybersecurity_attacks.csv";
    static {
        try {
            br = new BufferedReader(new FileReader(csvFilePath));
            br.readLine();
        } catch (FileNotFoundException e) {
            System.out.print("file not found ");
            throw new RuntimeException(e);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public static BufferedReader getScanner() {
        return br;
    }
    public static String[] getNextRow() throws IOException {
    String line ;
        if ((line=br.readLine()) != null){
              return line.split(splitBy);
        }
        return null;
}

    public static String[] getRandomRow() throws IOException {
        try {
            String randomLine = getRandomLineFromCSV(csvFilePath);
            assert randomLine != null;
            String[] valueArr=randomLine.split(splitBy);
            if (valueArr.length == 7){
                System.out.println("here");
            return valueArr;
            }else{
                System.out.println("there");
                return getRandomRow();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    public static String getRandomLineFromCSV(String filePath) throws IOException {
        List<String> lines = new ArrayList<>();

        // Read all lines from the CSV file
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line);
            }
        }

        if (lines.isEmpty()) {
            return null;
        }

        Random random = new Random();
        int randomIndex = random.nextInt(lines.size());

        return lines.get(randomIndex);
    }

}
