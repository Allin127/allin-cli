package ${java.package}.service;

import ${java.package}.dao.*;
import ${java.package}.mapper.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import java.util.*;

@Service
public class ${serviceClassName}Service {
    @Autowired
    ${serviceClassName}Mapper ${serviceClassName}Mapper;

    public List<${serviceClassName}> list() {
        return ${serviceClassName}Mapper.selectByExample(${serviceClassName}Example.builder().oredCriteria(new ArrayList()).build());
    }

    public ${serviceClassName} list(Long id) {
        return ${serviceClassName}Mapper.selectByPrimaryKey(id);
    }

    public int create(${serviceClassName} record) {
        return ${serviceClassName}Mapper.insert(record);
    }

    public int update(${serviceClassName} record) {
        return ${serviceClassName}Mapper.updateByPrimaryKey(record);
    }

    public int delete(Long id) {
        return ${serviceClassName}Mapper.deleteByPrimaryKey(id);
    }

}
// generate by allin-codeless