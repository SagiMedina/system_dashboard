import fetch from 'isomorphic-fetch';

export default function getSystemData() {
    return fetch('/system_data').then((response => response.json()));
}
