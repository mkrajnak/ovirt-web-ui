import $ from 'jquery'

import { logDebug } from 'ovirt-ui-components'

let OvirtApi = {}
OvirtApi = {
  _httpGet ({ url, custHeaders = { 'Accept': 'application/json', Filter: true } }) {
    logDebug(`_httpGet start: url="${url}"`)
    const headers = Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW46c21hcnR2bQ==',
    })
    logDebug(`_httpGet: url="${url}", headers="${JSON.stringify(headers)}"`)

    return $.ajax(url, {
      type: 'GET',
      headers,
    }).then(data => Promise.resolve(data))
  },
  _httpPost ({ url, input }) {
    return $.ajax(url, {
      type: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OvirtApi._getLoginToken()}`,
        'Filter': true,
      },
      data: input,
    }).then(data => Promise.resolve(data))
      .catch(data => {
        logDebug(`Ajax failed: ${JSON.stringify(data)}`)
        return Promise.reject(data)
      })
  },
  _httpPut ({ url, input }) {
    return $.ajax(url, {
      type: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OvirtApi._getLoginToken()}`,
      },
      data: input,
    }).then(data => Promise.resolve(data))
      .catch(data => {
        logDebug(`Ajax failed: ${JSON.stringify(data)}`)
        return Promise.reject(data)
      })
  },
  /**
   * @param vm - Single entry from ManageIQ REST /api/vms/[id]
   * @returns {} - Internal representation of a VM
   */
  vmToInternal ({ vm }) {
    return {
      id: vm['id'],
      name: vm['name'],
      location: vm['location'],

      created_on: vm['created_on'],
      updated_on: vm['updated_on'],
      guid: vm['guid'],

      power_state: vm['power_state'],
      state_changed_on: vm['[state_changed_on'],
      connection_state: vm['connection_state'],

      template: vm['template'],
      ems_ref_obj: vm['ems_ref_obj'], // template, but onlit if template is true

      miq_group_id: vm['miq_group_id'],
      ems_ref: vm['ems_ref'],               // ovirt api link
      ems_cluster_id: vm['ems_cluster_id'], // ovirt api cluster ID
      type: vm['type'],
      cloud: vm['cloud'],
      raw_power_state: vm['raw_power_state'],
      tenant_id: vm['tenant_id'],

      memory_reserve: vm['memory_reserve'] ? vm['memory_reserve'] : undefined,
      storage_id: vm['storage_id'] ? vm['storage_id'] : undefined,
    }
  },
  clusterToInternal ({ cluster }) {
    return {
      id: cluster.id,
      name: cluster.name,
    }
  },
  templateToInternal ({ template }) {
    return {
      id: template.id,
      name: template.name,
      cluster: template.cluster ? template.cluster.id : '0',
      template: template.template,
    }
  },
  getAllVms () {
    const url = 'https://10.34.60.107/api/vms'
    const data = OvirtApi._httpGet({ url })
    logDebug('********************************')
    logDebug(JSON.stringify(data))
    return data
  },
  getAllClusters () {
    const url = 'https://10.34.60.107/api/clusters'
    const data = OvirtApi._httpGet({ url })
    logDebug('********************************')
    logDebug(JSON.stringify(data))
    return data
  },
  getAllTemplates () {
    const url = 'https://10.34.60.107/api/templates'
    const data = OvirtApi._httpGet({ url })
    logDebug('********************************')
    logDebug(JSON.stringify(data))
    return data
  },
}

const Api = OvirtApi
export default Api
