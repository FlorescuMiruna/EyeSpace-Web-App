package com.example.eyespace.service;

import com.example.eyespace.model.Book;
import com.example.eyespace.model.BookSearchDetails;
import com.example.eyespace.model.Movie;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;

@Service
public class BookService {

    @Value("${apiHAPIBooksKey}")
    private String apiHAPIBooksKey;

    public ArrayList<BookSearchDetails> searchBookApi(String title) throws IOException, InterruptedException {

        String newTitle = title.replace(" ", "+");

        ArrayList<BookSearchDetails> bookSearchDetailsArrayList = new ArrayList<BookSearchDetails>();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://hapi-books.p.rapidapi.com/search/" + newTitle))
                .header("X-RapidAPI-Host", "hapi-books.p.rapidapi.com")
                .header("X-RapidAPI-Key",apiHAPIBooksKey )
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        //System.out.println("response.body():" + response.body());


        JSONArray array = new JSONArray(response.body());


        Integer dim = 3;

        if(array.length()<3){
            dim = array.length();
        }
        for(int i = 0; i < dim; i++)
        {
            JSONObject bookJson = array.getJSONObject(i);
            bookSearchDetailsArrayList.add(jsonToBookSearchDetails(bookJson));
        }

        return bookSearchDetailsArrayList;

    }



    public Book getBookByIdApi(String id) throws IOException, InterruptedException {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://hapi-books.p.rapidapi.com/book/" + id))
                .header("X-RapidAPI-Host", "hapi-books.p.rapidapi.com")
                .header("X-RapidAPI-Key", apiHAPIBooksKey)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());

        JSONObject json = new JSONObject(response.body());

        Book book = jsonToBook(json);
//        System.out.println("Book:" + book.toString());

        return book;
    }

    public BookSearchDetails jsonToBookSearchDetails(JSONObject jsonObject){

        BookSearchDetails bookSearchDetails = new BookSearchDetails();

        bookSearchDetails.setId((Integer) jsonObject.get("book_id"));
        bookSearchDetails.setName((String) jsonObject.get("name"));
        bookSearchDetails.setCoverUrl((String) jsonObject.get("cover"));
        bookSearchDetails.setYear((Integer) jsonObject.get("year"));

        return  bookSearchDetails;
    }

    private Book jsonToBook(JSONObject jsonObject) {

        Book book = new Book();

        book.setId((Integer) jsonObject.get("book_id"));
        book.setName((String) jsonObject.get("name"));
        book.setCoverUrl((String) jsonObject.get("cover"));
        book.setPages((Integer) jsonObject.get("pages"));
        book.setSynopsis((String) jsonObject.get("synopsis"));
        book.setDate((String) jsonObject.get("published_date"));

        JSONArray jsonArray= (JSONArray) jsonObject.get("authors");
        book.setAuthor((String) jsonArray.get(0));

        return book;
    }

}