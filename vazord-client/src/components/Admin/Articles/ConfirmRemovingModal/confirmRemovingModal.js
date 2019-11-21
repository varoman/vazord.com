import React from 'react';
import { Modal, Icon } from 'antd';


export default ({ isOpen, entity, onClose }) => {

	return (
		<div>
			<Modal
				title={<span><Icon type='warning' style={{color: 'red'}}/> Delete {entity}</span>}
				centered
				visible={isOpen}
				okText="Yes"
				onOk={() => onClose(true)}
				onCancel={() => onClose(false)}
			>
				<p>You are going to delete this <strong>{entity}</strong></p>
				<p>Are you sure?</p>
			</Modal>
		</div>
	);
};
