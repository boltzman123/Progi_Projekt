package oop.dao;

import oop.domain.Child;
import oop.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface ChildRepository extends JpaRepository<Child, Users> {
    @Query("SELECT c FROM Child c where :i = c.childId and :mail = c.user.email")
    Optional<Child> findByUserAndChildId(@Param("mail") String email, @Param("i") Long id);
    @Query("SELECT c FROM Child c where :mail = c.user.email")
    List<Child> findByUser(@Param("mail") String email);

}
