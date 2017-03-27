import $ from 'jquery'

import { logDebug } from 'ovirt-ui-components'

const serverUrl = 'https://10.34.60.107/'
let OvirtApi = {}
OvirtApi = {
  _httpGet ({ url }) {
    logDebug(`_httpGet start: url="${url}"`)
    const headers = Object.assign({
      'Accept': 'application/json',
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
      id: vm.id,
      name: vm.name,
      location: vm.location,

      created_on: vm.created_on,
      updated_on: vm.updated_on,
      guid: vm.guid,

      power_state: vm.power_state,
      state_changed_on: vm.state_changed_on,
      connection_state: vm.connection_state,

      template: vm.template,
      ems_ref_obj: vm.ems_ref_obj, // template, but onlit if template is true

      miq_group_id: vm.miq_group_id,
      ems_ref: vm.ems_ref,               // ovirt api link
      cluster: vm.ems_cluster_id, // ovirt api cluster ID
      type: vm.type,
      cloud: vm.cloud,
      raw_power_state: vm.raw_power_state,
      tenant_id: vm.tenant_id,

      memory_reserve: vm.memory_reserve ? vm.memory_reserve : undefined,
      storage_id: vm.storage_id ? vm.storage_id : undefined,
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
      cluster: template.ems_cluster_id,
    }
  },
  getAllVms () {
    const url = serverUrl + '/api/vms'
    return OvirtApi._httpGet({ url })
  },
  getAllClusters () {
    const url = serverUrl + '/api/clusters/'
    return OvirtApi._httpGet({ url })
  },
  getAllTemplates () {
    const url = serverUrl + '/api/templates'
    return OvirtApi._httpGet({ url })
  },
  getCluster ({ url }) {
    return OvirtApi._httpGet({ url })
  },
  getTemplate ({ url }) {
    return OvirtApi._httpGet({ url })
  },
  getVm ({ url }) {
    return OvirtApi._httpGet({ url })
  },
}

const Api = OvirtApi
export default Api
