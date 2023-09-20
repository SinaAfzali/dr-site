const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore('codes', { keyPath: 'key' });
};

request.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction('codes', 'readwrite');
  const objectStore = transaction.objectStore('codes');

  // ایجاد یک شیء از کلاس Code
  const code = new Code('myKey', 'myValue');

  // ذخیره کردن شیء در پایگاه داده
  const request = objectStore.add(code);

  request.onsuccess = function(event) {
    console.log('شیء با موفقیت در پایگاه داده ذخیره شد');
  };

  request.onerror = function(event) {
    console.error('خطا در ذخیره کردن شیء در پایگاه داده', event.target.error);
  };

  transaction.oncomplete = function(event) {
    db.close();
  };
};

request.onerror = function(event) {
  console.error('خطا در ایجاد پایگاه داده', event.target.error);
};























































const request = indexedDB.open('database_name', 1);

// رویداد موفقیت‌آمیز باز کردن پایگاه داده
request.onsuccess = function(event) {
  const db = event.target.result;

  // شروع تراکنش
  const transaction = db.transaction('store_name', 'readwrite');
  const objectStore = transaction.objectStore('store_name');

  // دریافت همه داده‌ها از ObjectStore
  const request = objectStore.getAll();

  request.onsuccess = function(event) {
    const data = event.target.result;

    // پیدا کردن داده مورد نظر برای حذف
    const itemToDelete = data.find(item => item.value === 33);
    
    if (itemToDelete) {
      // حذف داده
      const deleteRequest = objectStore.delete(itemToDelete.code);

      deleteRequest.onsuccess = function(event) {
        console.log('داده با موفقیت حذف شد');
      };

      deleteRequest.onerror = function(event) {
        console.error('خطا در حذف داده', event.target.error);
      };
    } else {
      console.log('داده مورد نظر یافت نشد');
    }
  };

  request.onerror = function(event) {
    console.error('خطا در دریافت داده‌ها', event.target.error);
  };

  // پایان تراکنش
  transaction.oncomplete = function(event) {
    db.close();
  };

  transaction.onerror = function(event) {
    console.error('خطا در انجام تراکنش', event.target.error);
  };
};

request.onerror = function(event) {
  console.error('خطا در باز کردن پایگاه داده', event.target.error);
};