import { ChainType, MCC } from '@flarenetwork/mcc';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/config/configuration';
import {
  AttestationResponseDTO_ConfirmedBlockHeightExists_Response,
  ConfirmedBlockHeightExists_Request,
  ConfirmedBlockHeightExists_Response,
} from 'src/dtos/attestation-types/ConfirmedBlockHeightExists.dto';
import { AttestationResponse } from 'src/dtos/generic/generic.dto';
import { serializeBigInts } from 'src/external-libs/utils';
import { getAttestationStatus } from 'src/verification/attestation-types/attestation-types';
import { verifyConfirmedBlockHeightExists } from 'src/verification/generic-chain-verifications';
import { EntityManager } from 'typeorm';
import {
  BaseVerifierServiceWithIndexer,
  ITypeSpecificVerificationServiceConfig,
} from './common/verifier-base.service';
import {
  DogeIndexerQueryManager,
  BtcIndexerQueryManager,
} from 'src/indexed-query-manager/UtxoIndexQueryManager';
import { XrpIndexerQueryManager } from 'src/indexed-query-manager/XrpIndexerQueryManager';

abstract class BaseConfirmedBlockHeightExistsVerifierService extends BaseVerifierServiceWithIndexer<
  ConfirmedBlockHeightExists_Request,
  ConfirmedBlockHeightExists_Response
> {
  constructor(
    protected configService: ConfigService<IConfig>,
    protected manager: EntityManager,
    options: ITypeSpecificVerificationServiceConfig,
  ) {
    super(configService, manager, {
      ...options,
      attestationName: 'ConfirmedBlockHeightExists',
    });
  }

  async verifyRequest(
    fixedRequest: ConfirmedBlockHeightExists_Request,
  ): Promise<AttestationResponseDTO_ConfirmedBlockHeightExists_Response> {
    const result = await verifyConfirmedBlockHeightExists(
      fixedRequest,
      this.indexedQueryManager,
    );
    return serializeBigInts({
      status: getAttestationStatus(result.status),
      response: result.response,
    }) as AttestationResponse<ConfirmedBlockHeightExists_Response>;
  }
}

@Injectable()
export class DOGEConfirmedBlockHeightExistsVerifierService extends BaseConfirmedBlockHeightExistsVerifierService {
  constructor(
    protected configService: ConfigService<IConfig>,
    protected manager: EntityManager,
  ) {
    super(configService, manager, {
      source: ChainType.DOGE,
      mccClient: MCC.DOGE,
      indexerQueryManager: DogeIndexerQueryManager,
    });
  }
}

@Injectable()
export class BTCConfirmedBlockHeightExistsVerifierService extends BaseConfirmedBlockHeightExistsVerifierService {
  constructor(
    protected configService: ConfigService<IConfig>,
    protected manager: EntityManager,
  ) {
    super(configService, manager, {
      source: ChainType.BTC,
      mccClient: MCC.BTC,
      indexerQueryManager: BtcIndexerQueryManager,
    });
  }
}

@Injectable()
export class XRPConfirmedBlockHeightExistsVerifierService extends BaseConfirmedBlockHeightExistsVerifierService {
  constructor(
    protected configService: ConfigService<IConfig>,
    protected manager: EntityManager,
  ) {
    super(configService, manager, {
      source: ChainType.XRP,
      mccClient: MCC.XRP,
      indexerQueryManager: XrpIndexerQueryManager,
    });
  }
}
