import React, { Component } from 'react'
import Demo from './Demo'
import LoaderHOC from '../components/LoaderHOC'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import { getGroups } from '../actions/getGroups-action'
import filterObject from '../config/filterObject'
import { Tree } from 'antd';
import TableLoader from '../components/TableLoader'
import { Skeleton } from 'antd';
import Trans from '../usetranslation/Trans'


const { DirectoryTree } = Tree;
var datas = []
var convertedData = []

function convert(array) {
    var map = [{}]
    for (var i = 0; i < array.length; i++) {
        var obj = array[i]
        if (!(obj.id in map)) {
            map[obj.id] = obj
            map[obj.id].children = []
        }

        if (typeof map[obj.id].name == 'undefined') {
            map[obj.id].title = obj.title
            map[obj.id].key = obj.key
        }

        var parent = obj.parent || '-';
        if (!(parent in map)) {
            map[parent] = {}
            map[parent].children = []
        }

        map[parent].children.push(map[obj.id])
    }
    console.log(map['-'].children)
    return map['-'].children
}
var pid;




class ProductFolder extends Component {
    onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
        filterObject.gp = keys[0]
        filterObject.pg = 0
        this.props.fetchData(this.props.from)
    };

    onExpand = () => {
        console.log('Trigger Expand');
    };


    render() {
        datas = []
        convertedData = []

       Object.values(this.props.groups).map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            datas.push({
                "id": d.Id, "name": d.Name, "parent": pid, "title": d.Name, "key": d.Id
            })
        })
        convertedData = convert(datas)

        this.props.from === 'products' ? convertedData.unshift({   "id": '', "name": <Trans word={'all_products'}/>, "parent": '', "title":<Trans word={'all_products'}/>, "key":''}) :
        convertedData.unshift({   "id": '', "name": <Trans word={'all_customers'}/>, "parent": '', "title":<Trans word={'all_customers'}/>, "key":''})
       

        return (

            <div className='table_wrapper group_col_wrapper_side'>

                {
                    this.props.state.groups.fetching ? <TableLoader className='custom_table_loader show' /> : <TableLoader className='custom_table_loader hidden' />
                }
                <DirectoryTree
                    multiple
                    defaultSelectedKeys={['']}
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    treeData={convertedData}
                />

            </div>

        )
    }
}


const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData, getGroups
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductFolder)




