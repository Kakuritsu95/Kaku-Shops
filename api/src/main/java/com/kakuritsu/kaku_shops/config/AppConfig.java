package com.kakuritsu.kaku_shops.config;

import io.micrometer.common.util.StringUtils;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;


@Configuration
public class AppConfig  {
   @Primary
   @Bean("vanillaMapper")
   public ModelMapper modelMapper(){
        return new ModelMapper();
    }
    @Bean("skipEmptyPropertiesMapper")
    public ModelMapper nonNullFieldsMapper(){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
                .setPropertyCondition(mappingContext -> StringUtils.isNotBlank(mappingContext.getSource().toString()))
                .setPropertyCondition(Conditions.isNotNull());
        return mapper;
    }
}
