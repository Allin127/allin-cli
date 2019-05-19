package com.vonallin.jobapp.dao;

import java.util.Date;

public class TJobTask {
    private Long id;

    private String crontab;

    private String triggerUrl;

    private Date createTime;

    private Integer status;

    public TJobTask(Long id, String crontab, String triggerUrl, Date createTime, Integer status) {
        this.id = id;
        this.crontab = crontab;
        this.triggerUrl = triggerUrl;
        this.createTime = createTime;
        this.status = status;
    }

    public TJobTask() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCrontab() {
        return crontab;
    }

    public void setCrontab(String crontab) {
        this.crontab = crontab == null ? null : crontab.trim();
    }

    public String getTriggerUrl() {
        return triggerUrl;
    }

    public void setTriggerUrl(String triggerUrl) {
        this.triggerUrl = triggerUrl == null ? null : triggerUrl.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}