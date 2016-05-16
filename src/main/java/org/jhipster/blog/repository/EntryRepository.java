package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Blog;
import org.jhipster.blog.domain.Entry;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Entry entity.
 */
@SuppressWarnings("unused")
public interface EntryRepository extends JpaRepository<Entry,Long> {

    @Query("select distinct entry from Entry entry left join fetch entry.tags")
    List<Entry> findAllWithEagerRelationships();

    @Query("select entry from Entry entry left join fetch entry.tags where entry.id =:id")
    Entry findOneWithEagerRelationships(@Param("id") Long id);
    
    @Query("select entry from Entry entry where entry.blog.user.login = ?#{principal.username}")
    List<Entry> findByUserIsCurrentUser();
    
    @Query("select entry from Entry entry left join entry.tags tag where tag.id =:id")
    List<Entry> findByTag(@Param("id") Long id);

}
