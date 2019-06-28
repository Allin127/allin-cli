package ${java.package}.resource;

import ${java.package}.dao.*;
import ${java.package}.service.*;
import com.vonallin.lib.base.dto.BaseResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("${rootResourcePath}")
public class ${serviceClassName}Resource {
    @Autowired
    ${serviceClassName}Service ${serviceClassName}Service;

    @RequestMapping(value = "/read", method = RequestMethod.GET)
    public BaseResponseDTO read() {
        List<${serviceClassName}> data = ${serviceClassName}Service.list();
        BaseResponseDTO<List<${serviceClassName}>> resp = new BaseResponseDTO<>(data);
        return resp;
    }

    @RequestMapping(value = "/read/{id}", method = RequestMethod.GET)
    public BaseResponseDTO<${serviceClassName}> readById(@PathVariable("id") Long id) {
        ${serviceClassName} data = ${serviceClassName}Service.list(id);
        BaseResponseDTO<${serviceClassName}> resp = new BaseResponseDTO<>(data);
        return resp;
    }


    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public BaseResponseDTO create(@RequestBody ${serviceClassName} record) {
        record.setId(null);
        int count = ${serviceClassName}Service.create(record);
        BaseResponseDTO<Long> resp = new BaseResponseDTO<>(record.getId());
        return resp;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public BaseResponseDTO update(@RequestBody ${serviceClassName} record) {
        int count = ${serviceClassName}Service.update(record);
        BaseResponseDTO<Integer> resp = new BaseResponseDTO<>(count);
        return resp;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public BaseResponseDTO delete(@RequestBody Long id) {
        int count = ${serviceClassName}Service.delete(id);
        BaseResponseDTO<Integer> resp = new BaseResponseDTO<>(count);
        return resp;
    }
}
// generate by allin-codeless