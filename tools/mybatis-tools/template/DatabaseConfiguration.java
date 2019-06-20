package ${java.package}.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import javax.sql.DataSource;

import static ${java.package}.config.DatabaseConfiguration.SQLSESSION_FACTORY;

@Configuration
@MapperScan(basePackages = "${java.package}.mapper", sqlSessionFactoryRef = SQLSESSION_FACTORY)
public class DatabaseConfiguration {
    public static final String DATA_SOURCE = "${java.package}.data.source";

    public static final String TRANSCATION_MANAGER = "${java.package}.transcation.manager";

    public static final String SQLSESSION_FACTORY = "${java.package}.session.factory";

    @Value("${spring.datasource.driverClassName}")
    private String driverClassName;
    @Value("${spring.datasource.url}")
    private String url;
    @Value("${spring.datasource.username}")
    private String userName;
    @Value("${spring.datasource.password}")
    private String password;

    private String db = "${module}";

    @Bean(name = DATA_SOURCE)
    public DataSource dataSource() {
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName(driverClassName);
    dataSource.setUrl(url+db+"?useUnicode=true&characterEncoding=utf-8");
    dataSource.setUsername(userName);
    dataSource.setPassword(password);
    return dataSource;
    }


    @Bean(name = TRANSCATION_MANAGER)
    public DataSourceTransactionManager dataSourceTransactionManager(@Qualifier(DATA_SOURCE) DataSource ds) {
        return new DataSourceTransactionManager(ds);
    }

    @Bean(name = SQLSESSION_FACTORY)
    public SqlSessionFactory sqlSessionFactory(@Qualifier(DATA_SOURCE) DataSource ds) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(ds);
        return bean.getObject();
    }

    }
