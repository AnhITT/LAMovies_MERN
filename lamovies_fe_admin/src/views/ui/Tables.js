import ProjectTables from "../../components/dashboard/ProjectTable";
import React, { useState, useEffect } from "react";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import { GetAccountAPI } from "../../api/account";
const Tables = () => {
    return (
        <Row>
            <Col lg="12">
                <ProjectTables />
            </Col>
        </Row>
    );
};

export default Tables;
