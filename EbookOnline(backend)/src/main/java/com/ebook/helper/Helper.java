package com.ebook.helper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

import com.ebook.entity.BookDetails;

public class Helper {

	public static void uploadBookImg(MultipartFile file, String uploadBookImages, BookDetails bookDetails)
			throws IOException {
		// Delete the old image file
		if (bookDetails.getBookImg() != null) {
			Path oldImagePath = Paths.get(uploadBookImages, bookDetails.getBookImg());
			Files.deleteIfExists(oldImagePath);
		}

		// Create the directory if it does not exist
		Path dirPath = Paths.get(uploadBookImages);
		if (!Files.exists(dirPath)) {
			Files.createDirectories(dirPath);
		}
		Path path = Paths.get(uploadBookImages, file.getOriginalFilename());
		String originalFilename = file.getOriginalFilename();
		// Check if file already exists and handle naming conflict
		int counter = 1;
		while (Files.exists(path)) {
			String newFilename = originalFilename.substring(0, originalFilename.lastIndexOf('.')) + "_" + counter
					+ originalFilename.substring(originalFilename.lastIndexOf('.'));
			path = Paths.get(uploadBookImages, newFilename);
			bookDetails.setBookImg(newFilename);
			counter++;

		}
		Files.write(path, file.getBytes());
		bookDetails.setBookImg(file.getOriginalFilename());
	}
}
