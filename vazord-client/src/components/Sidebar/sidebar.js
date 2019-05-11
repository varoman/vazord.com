import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import './sidebar.css';


const { SubMenu } = Menu;
const { Sider } = Layout;

const contents = [
    {
        category: 'Սկսնակներ',
        subcategories: ['Վազքի մասին', 'Սկսել զրոյից']
    },
    {
        category: 'Աթլետներ',
        subcategories: ['Կանոնակարգի ընտրություն', 'Պարապմունքների կառուցվածքը']
    },
    {
        category: 'Աքսեսուարներ',
        subcategories: ['Կոշիկներ', 'Կոնկրետ մոդելներ']
    },
    {
        category: 'Միջոցառումներ',
        subcategories: ['Տարածաշրջանային մրցումներ', 'Մրցումների կազմակերպում']
    },
    {
        category: 'Առողջական',
        subcategories: ['Գրիպ և մրսածություն', 'Տրոմբ, տոքերի էմբոլիա']
    },
    {
        category: 'Կայքի մասին',
        subcategories: ['Հեղինակի մասին', 'Օգտագործման պայմաններ']
    }
];

const generateCategories = () => {
    let nodes = [];
    contents.map((content, key) => {
        nodes.push(
            <SubMenu
                key={key}
                title={<span className="Navigation-text">{content.category}</span>}
            >
                {generateSubcategories(content.subcategories)}
            </SubMenu>
        );
        return null;
    });
    return nodes;
};

const generateSubcategories = subcategories => {
    let nodes = [];
    subcategories.map( subcategory => {
        nodes.push(
            <Menu.Item key={subcategory}><Link to={`/articles/${subcategory}`}>{subcategory}</Link></Menu.Item>
        );
        return null;
    });
    return nodes;
};

export default () => (
    <Sider
        className="App-sider"
        collapsible={true}
        collapsedWidth="0"
        width="300px"
    >
        <Menu
            className="Navigation-container"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            {generateCategories()}
        </Menu>
    </Sider>
);
