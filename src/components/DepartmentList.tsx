import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departments = [
  {
    id: 1,
    name: 'customer_service',
    subDepartments: [
      { id: 101, name: 'support' },
      { id: 102, name: 'customer_success' },
      { id: 103, name: 'feedback' }
    ]
  },
  {
    id: 2,
    name: 'design',
    subDepartments: [
      { id: 201, name: 'graphic_design' },
      { id: 202, name: 'product_design' },
      { id: 203, name: 'web_design' },
      { id: 204, name: 'ux_design' }
    ]
  },
  {
    id: 3,
    name: 'development',
    subDepartments: [
      { id: 301, name: 'frontend' },
      { id: 302, name: 'backend' },
      { id: 303, name: 'fullstack' },
      { id: 304, name: 'devops' }
    ]
  },
  {
    id: 4,
    name: 'marketing',
    subDepartments: [
      { id: 401, name: 'seo' },
      { id: 402, name: 'content_marketing' },
      { id: 403, name: 'social_media' }
    ]
  },
  {
    id: 5,
    name: 'sales',
    subDepartments: [
      { id: 501, name: 'lead_generation' },
      { id: 502, name: 'account_management' },
      { id: 503, name: 'customer_relations' }
    ]
  }
];

const DepartmentList = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<{ [key: number]: boolean }>({});

  const handleToggle = (id: number) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSelectParent = (deptId: number) => {
    const department = departments.find(dept => dept.id === deptId);
    if (!department) return;

    const allSubIds = department.subDepartments.map(sub => sub.id);
    const allSelected = allSubIds.every(subId => selected[subId]);
    const newSelected = { ...selected };

    allSubIds.forEach(subId => {
      newSelected[subId] = !allSelected;
    });

    newSelected[deptId] = !allSelected;
    setSelected(newSelected);
  };

  const handleSelectChild = (subId: number, deptId: number) => {
    const department = departments.find(dept => dept.id === deptId);
    if (!department) return;

    const newSelected = { ...selected, [subId]: !selected[subId] };
    const allSubSelected = department.subDepartments.every(sub => newSelected[sub.id]);
    newSelected[deptId] = allSubSelected;
    setSelected(newSelected);
  };

  return (
    <List>
      {departments.map(dept => (
        <React.Fragment key={dept.id}>
          <ListItem>
            <Checkbox
              edge="start"
              checked={!!selected[dept.id] && dept.subDepartments.every(sub => selected[sub.id])}
              indeterminate={dept.subDepartments.some(sub => selected[sub.id]) && !dept.subDepartments.every(sub => selected[sub.id])}
              onChange={() => handleSelectParent(dept.id)}
            />
            <ListItemText primary={`${dept.name} (${dept.subDepartments.length})`} />
            <IconButton onClick={() => handleToggle(dept.id)}>
              {expanded.includes(dept.id) ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          {expanded.includes(dept.id) && (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              {dept.subDepartments.map(subDept => (
                <ListItem key={subDept.id} sx={{ pl: 4 }}>
                  <FormControlLabel
                    label={subDept.name}
                    control={
                      <Checkbox
                        edge="start"
                        checked={!!selected[subDept.id]}
                        onChange={() => handleSelectChild(subDept.id, dept.id)}
                      />
                    }
                  />
                </ListItem>
              ))}
            </Box>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
