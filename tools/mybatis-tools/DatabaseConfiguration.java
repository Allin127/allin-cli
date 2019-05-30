package ${java.package}.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "${java.package}.mapper")
public class DatabaseConfiguration {
}
