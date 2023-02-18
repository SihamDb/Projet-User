package com.example.projetapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class Controller {

    @Autowired
    RepositoryUser repositoryUser;

    @GetMapping
    public List<Utilisateur> getUsers() {
        return repositoryUser.findAll();
    }
    @PostMapping
    public Utilisateur createUser(@RequestBody Utilisateur user){
        return repositoryUser.save(user);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Integer Id) {

         repositoryUser.deleteById(Id);
    }
}


