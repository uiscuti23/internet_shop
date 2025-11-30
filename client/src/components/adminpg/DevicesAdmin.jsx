import cl from '../../styles/adminpg/devices/device_admin.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hook/useAuth';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import { LoaderDual } from '../animation/LoaderDual';
import { NotFound } from '../NotFound';
import { DevicesCol } from './devices_components/DevicesCol';
import { DeviceCreate } from './devices_components/DeviceCreate';
import { AdminFilter } from '../forms/AdminFilter';
import { NewModal } from '../NewModal';
import { BrandsCreate } from './brands_components/BrandsCreate';
import { TypeCreate } from './types_components/TypeCreate';

const DevicesAdmin = observer(() => {
  const { stores, getDevices, closePopup } = useAuth();
  const devices = stores.device.devices;

  const isLoading = stores.device.isLoading;

  const types = stores.type.types;

  useEffect(() => {
    stores.device.setIsLoading(true);
    getDevices();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const deviceQuery = searchParams.get('variable') || '';

  const filterDevices = devices =>
    devices.filter(brand => brand.name.toLowerCase().includes(deviceQuery.toLowerCase()));

  const filteredDevices = filterDevices(devices);

  const filterParams = {
    varQuery: deviceQuery,
    setSearchParams,
    varArr: devices,
    varName: 'devices',
  };

  const [deviceModalIsActive, setDeviceModalIsActive] = useState(false);
  const [typeModalIsActive, setTypeModalIsActive] = useState(false);
  const [brandModalIsActive, setBrandModalIsActive] = useState(false);

  const [selectedBrandValue, setSelectedBrandValue] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  const [selectedTypeValue, setSelectedTypeValue] = useState('');
  const [selectedTypeId, setSelectedTypeId] = useState(null);

  const selectedBrandParams = {
    selectedBrandValue,
    setSelectedBrandValue,
    selectedBrandId,
    setSelectedBrandId,
  };

  const selectedTypeParams = {
    selectedTypeValue,
    setSelectedTypeValue,
    selectedTypeId,
    setSelectedTypeId,
  };

  return (
    <div className={cl.table}>
      <h2>Devices</h2>
      <AdminFilter filterParams={filterParams} setModalIsActive={setDeviceModalIsActive}>
        <NewModal
          isActive={deviceModalIsActive}
          setIsActive={setDeviceModalIsActive}
          closePopup={closePopup}
          title={'Create new device'}>
          <DeviceCreate
            isActive={deviceModalIsActive}
            setIsActive={setDeviceModalIsActive}
            setTypeModalIsActive={setTypeModalIsActive}
            setBrandModalIsActive={setBrandModalIsActive}
            selectedBrandParams={selectedBrandParams}
            selectedTypeParams={selectedTypeParams}
          />
        </NewModal>
        <NewModal
          isActive={typeModalIsActive}
          setIsActive={setTypeModalIsActive}
          closePopup={closePopup}
          isNested={true}
          setIsParentActiveValue={setDeviceModalIsActive}
          title={'Add type'}>
          <TypeCreate
            types={types}
            isActive={typeModalIsActive}
            setIsActive={setTypeModalIsActive}
            setIsParentActiveValue={setDeviceModalIsActive}
            setSelectedItemValue={setSelectedTypeValue}
            setSelectedItemId={setSelectedTypeId}
          />
        </NewModal>
        <NewModal
          isActive={brandModalIsActive}
          setIsActive={setBrandModalIsActive}
          closePopup={closePopup}
          isNested={true}
          setIsParentActiveValue={setDeviceModalIsActive}
          title={'Add brand'}>
          <BrandsCreate
            isActive={brandModalIsActive}
            setIsActive={setBrandModalIsActive}
            setIsParentActiveValue={setDeviceModalIsActive}
            setSelectedItemValue={setSelectedBrandValue}
            setSelectedItemId={setSelectedBrandId}
          />
        </NewModal>
      </AdminFilter>
      {isLoading ? (
        <div className={cl.loader_wrapper}>
          <LoaderDual />
        </div>
      ) : (
        <div className={cl.table__row}>
          {filteredDevices.length === 0 && <NotFound element='Devices' />}
          {filteredDevices.length !== 0 && (
            <ul className={cl.columns__row}>
              {filteredDevices.map(device => (
                <DevicesCol key={device.id} device={device} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
});

export { DevicesAdmin };
