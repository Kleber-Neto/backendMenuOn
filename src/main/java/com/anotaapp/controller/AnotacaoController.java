
package com.anotaapp.controller;

import com.anotaapp.model.Anotacao;
import com.anotaapp.repository.AnotacaoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/anotacoes")
public class AnotacaoController {

    private final AnotacaoRepository repository;

    public AnotacaoController(AnotacaoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Anotacao> listar() {
        return repository.findAll();
    }

    @PostMapping
    public void adicionar(@RequestBody Anotacao nova) {
        repository.save(nova);
    }

    @PutMapping
    public void substituirTodas(@RequestBody List<Anotacao> novas) {
        repository.deleteAll();
        repository.saveAll(novas);
    }
}

// package com.anotaapp.controller;

// import com.anotaapp.model.Anotacao;
// import com.fasterxml.jackson.core.type.TypeReference;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.springframework.web.bind.annotation.*;

// import java.io.File;
// import java.io.IOException;
// import java.util.List;

// @RestController
// @RequestMapping("/api/anotacoes")
// public class AnotacaoController {

// private final ObjectMapper objectMapper = new ObjectMapper();
// private final File arquivo = new File("anotacoes.txt");

// @GetMapping
// public List<Anotacao> listar() throws IOException {
// if (!arquivo.exists())
// return new java.util.ArrayList<>();
// return objectMapper.readValue(arquivo, new TypeReference<>() {
// });
// }

// @PostMapping
// public void adicionar(@RequestBody Anotacao nova) throws IOException {
// List<Anotacao> anotacoes = listar();
// anotacoes.add(nova);
// objectMapper.writeValue(arquivo, anotacoes);
// }

// @PutMapping
// public void substituirTodas(@RequestBody List<Anotacao> novas) throws
// IOException {
// objectMapper.writeValue(arquivo, novas);
// }
// }
