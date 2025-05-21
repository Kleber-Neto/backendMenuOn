package com.anotaapp.repository;

import com.anotaapp.model.Anotacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnotacaoRepository extends JpaRepository<Anotacao, String> {
}
