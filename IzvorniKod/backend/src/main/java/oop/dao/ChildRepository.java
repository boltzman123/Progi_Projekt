package oop.dao;

import oop.domain.Child;
import oop.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChildRepository extends JpaRepository<Child, Users> {
    @Query("SELECT c FROM Child c where :i = c.childId and :mail = c.user.email")
    Optional<Child> findByUserAndChildId(@Param("mail") String email, @Param("i") Long id);
}
