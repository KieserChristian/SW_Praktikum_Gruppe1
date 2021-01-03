import React, {Component} from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import ProjectAdministration from '../../api/ProjectAdministration';
import ProjectListEntry from '../ProjectListEntry.js';
import DozentProjectListEntry from './DozentProjectListEntry'
import PersonNBO from '../../api/PersonNBO';


class ProjectEdit extends Component{

    constructor(props){
        super(props);

        this.state ={
            
            project:[],
            "currentProject": null,
            error: null,
            loadingInProgress: false,
        }
    }
}