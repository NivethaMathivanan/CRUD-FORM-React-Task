import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReq, getAllReq, getIdReq } from '../Redux/Action/action';
import { useNavigate } from 'react-router-dom';
import './Table.css'
import { toast } from 'react-toastify';
import Loading from '../loading/Loading';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const Table = ({ id }) => {
 
  const [array, setArray] = useState([])
  const navigate = useNavigate();
  const state = useSelector((state) => state.crudReducer.item);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);



  const exportCSV = () => {
    dt.current.exportCSV();
  };

const confirmDeleteProductSec = async (product) => {
  if (product && product.id) { 
  dispatch(deleteReq(product.id));
  await new Promise((Resolve) => {
    toast.error(" All items Deleted Successfully", {
      position: 'top-left',
      onClose: Resolve,
      theme: 'dark'
    })
  })
} else{
  console.error("Product ID is undefined");
}
};


  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2 heaFirst  ">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew} />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={() => selectedProducts.forEach(product => confirmDeleteProductSec(product))} 
          disabled={!selectedProducts || !selectedProducts.length} />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    )
  };


  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between  ">
      <h2 className="m-0">Manage Products</h2>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search  " />
        <InputText
          className='mt-2'
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..." />
      </IconField>
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil"
          rounded outlined className="mr-2"
          onClick={() => editProduct(rowData)} />&nbsp;
        <Button
          icon="pi pi-trash"
          rounded outlined severity="danger"
          onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  };

  

  const fetchItems = useCallback(() => {
    dispatch(getAllReq());
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    setArray(state);
  }, [state]);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, []);

  const confirmDeleteProduct = async (product) => {
    dispatch(deleteReq(product.id));
    await new Promise((Resolve) => {
      toast.error("Deleted Successfully", {
        position: 'top-right',
        onClose: Resolve,
        theme: 'dark'
      })
    })
  };

  const editProduct = (data) => {
    navigate('/Form', { state: { data } });
  }

  useEffect(() => {
    if (id) {
      dispatch(getIdReq(id));
    }
  }, [id, dispatch])

  const openNew = () => {
    navigate("/Form")
  }

  return (
    <div>
      {loading ?
        (
          <Loading loading={loading} />
        ) : (
          <>
            <div className="card mx-auto d-black ">
              <h1 className='text-center text-white' style={{ fontSize: "50px" }}>Datas</h1>

              <Toolbar className="mb-3 headButton "
                left={leftToolbarTemplate}
                right={rightToolbarTemplate}
              >

              </Toolbar>

              <DataTable
                ref={dt} value={array}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="id"
                paginator
                rows={10}
                className="custom-paginator" 
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                globalFilter={globalFilter}
                header={header}>
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column
                  field="id"
                  header="Code"
                  className=' text-center'
                  sortable
                  style={{ minWidth: '4rem' }}>
                </Column>
                <Column
                  field="firstName"
                  header=" First Name"

                  sortable
                  style={{ minWidth: '10rem' }}>

                </Column>
                <Column field="lastName"
                  header="Last Name"

                  sortable
                  style={{ minWidth: '10rem' }}>


                </Column>
                <Column field="userName"
                  header="Email"
                  sortable
                  style={{ minWidth: '16rem' }}>

                </Column>

                <Column field="state"
                  header="State"
                  sortable
                  style={{ minWidth: '10rem' }}>

                </Column>
                <Column field="city"
                  header="City"
                  sortable
                  style={{ minWidth: '12rem' }}>

                </Column>
                <Column
                  field="pinCode"
                  header="PinCode"
                  sortable
                  style={{ minWidth: '8rem' }}>
                </Column>
                <Column
                  field="checkBox"
                  header="Status"
                  sortable
                  style={{ minWidth: '8rem' }}>
                </Column>
                <Column
                  body={actionBodyTemplate}
                  header="Action"
                  exportable={false}
                  style={{ minWidth: '12rem' }}>

                </Column>
              </DataTable>
            </div>
         
          </>

        )};
    </div>
  );
};

export default Table;

