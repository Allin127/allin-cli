package com.vonallin.jobapp.mapper;

import com.vonallin.jobapp.dao.TJobTask;
import java.util.List;

public interface TJobTaskMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TJobTask record);

    TJobTask selectByPrimaryKey(Long id);

    List<TJobTask> selectAll();

    int updateByPrimaryKey(TJobTask record);
}